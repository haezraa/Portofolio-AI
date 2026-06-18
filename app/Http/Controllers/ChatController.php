<?php

namespace App\Http\Controllers;

use App\Models\ChatSession;
use App\Models\ChatMessage;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Setting;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string',
            'session_token' => 'nullable|string',
        ]);

        $sessionToken = $request->input('session_token');
        $session = $sessionToken
            ? ChatSession::where('session_token', $sessionToken)->first()
            : null;

        if (!$session) {
            $sessionToken = bin2hex(random_bytes(16));
            $session = ChatSession::create([
                'session_token' => $sessionToken,
                'ip_address' => $request->ip(),
            ]);
        }

        $skills = Skill::all(['name', 'category', 'level']);
        $projects = Project::all(['title', 'description_id', 'technologies', 'project_url', 'github_url']);
        $educations = Education::all(['institution', 'degree', 'start_year', 'end_year', 'description_id']);
        $experiences = Experience::all(['company_or_organization', 'position', 'start_date', 'end_date', 'description_id']);
        $settings = Setting::pluck('value', 'key')->toArray();

        $context = "Portfolio Data:\n\n";

        $context .= "=== SKILLS ===\n";
        foreach ($skills as $skill) {
            $context .= "- {$skill->name} ({$skill->category})";
            if ($skill->level) $context .= ", Level: {$skill->level}";
            $context .= "\n";
        }

        $context .= "\n=== PROJECTS ===\n";
        foreach ($projects as $project) {
            $context .= "- {$project->title}";
            if ($project->description_id) $context .= ": {$project->description_id}";
            if ($project->technologies) $context .= ", Technologies: " . implode(', ', $project->technologies);
            if ($project->project_url) $context .= ", URL: {$project->project_url}";
            if ($project->github_url) $context .= ", GitHub: {$project->github_url}";
            $context .= "\n";
        }

        $context .= "\n=== EDUCATION ===\n";
        foreach ($educations as $edu) {
            $context .= "- {$edu->degree} at {$edu->institution} ({$edu->start_year}";
            if ($edu->end_year) $context .= "-{$edu->end_year}";
            $context .= ")";
            if ($edu->description_id) $context .= ": {$edu->description_id}";
            $context .= "\n";
        }

        $context .= "\n=== EXPERIENCE ===\n";
        foreach ($experiences as $exp) {
            $context .= "- {$exp->position} at {$exp->company_or_organization} ({$exp->start_date}";
            if ($exp->end_date) $context .= " - {$exp->end_date}";
            $context .= ")";
            if ($exp->description_id) $context .= ": {$exp->description_id}";
            $context .= "\n";
        }

        $context .= "\n=== SETTINGS ===\n";
        foreach ($settings as $key => $value) {
            if ($value) $context .= "- {$key}: {$value}\n";
        }

        $history = ChatMessage::where('chat_session_id', $session->id)
            ->orderBy('created_at', 'asc')
            ->limit(10)
            ->get(['sender', 'message']);

        $messages = [
            [
                'role' => 'system',
                'content' => "You are an AI Assistant for Muhammad Akbar Hezra's portfolio website. Answer questions politely based ONLY on the provided portfolio data. If asked about something not in the data, politely say you don't know.\n\n{$context}",
            ],
        ];

        foreach ($history as $msg) {
            $messages[] = [
                'role' => $msg->sender === 'assistant' ? 'assistant' : 'user',
                'content' => $msg->message,
            ];
        }

        $messages[] = ['role' => 'user', 'content' => $request->input('message')];

        ChatMessage::create([
            'chat_session_id' => $session->id,
            'sender' => 'user',
            'message' => $request->input('message'),
        ]);

        $response = Http::withoutVerifying()->withHeaders([
            'Authorization' => 'Bearer ' . config('services.openrouter.key'),
            'Content-Type' => 'application/json',
            'HTTP-Referer' => 'http://localhost:8000',
            'X-Title' => 'AI Portfolio',
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            'model' => 'google/gemini-2.5-flash:free',
            'messages' => $messages,
        ]);

        if ($response->failed()) {
            Log::error('OpenRouter Error: ' . $response->body());
            $aiMessage = 'Sorry, I could not get a response. Please try again.';
        } else {
            $aiMessage = $response->json('choices.0.message.content', 'Sorry, I could not get a response.');
        }

        ChatMessage::create([
            'chat_session_id' => $session->id,
            'sender' => 'assistant',
            'message' => $aiMessage,
        ]);

        return response()->json([
            'session_token' => $sessionToken,
            'message' => $aiMessage,
        ]);
    }
}
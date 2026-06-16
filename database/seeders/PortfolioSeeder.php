<?php

namespace Database\Seeders;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        Skill::create(['name' => 'Laravel', 'category' => 'Backend', 'level' => 5, 'logo' => null]);
        Skill::create(['name' => 'React', 'category' => 'Frontend', 'level' => 4, 'logo' => null]);
        Skill::create(['name' => 'Tailwind CSS', 'category' => 'Frontend', 'level' => 4, 'logo' => null]);
        Skill::create(['name' => 'Python', 'category' => 'AI/ML', 'level' => 3, 'logo' => null]);

        Education::create([
            'institution' => 'SMKN 4 Tangerang',
            'degree' => 'Rekayasa Perangkat Lunak',
            'start_year' => 2024,
            'end_year' => 2027,
            'description_id' => 'Program keahlian yang fokus pada pengembangan perangkat lunak dan aplikasi web.',
            'description_en' => null,
        ]);

        Education::create([
            'institution' => 'Universitas Indonesia',
            'degree' => 'Teknik Informatika',
            'start_year' => 2028,
            'end_year' => null,
            'description_id' => 'Study program in progress.',
            'description_en' => null,
        ]);

        Experience::create([
            'company_or_organization' => 'PT. Tech Innovate Indonesia',
            'position' => 'Fullstack Developer Intern',
            'start_date' => '2026-06-01',
            'end_date' => null,
            'description_id' => '<p>Mengembangkan aplikasi web menggunakan Laravel dan React untuk klien internal.</p><p>Mentegrasikan API AI untuk meningkatkan fungsionalitas aplikasi.</p>',
            'description_en' => '<p>Developing web applications using Laravel and React for internal clients.</p><p>Integrating AI APIs to enhance application functionality.</p>',
        ]);

        Project::create([
            'title' => 'AI-Powered Portfolio Website',
            'thumbnail' => 'portfolio-thumbnail.jpg',
            'description_id' => 'Website portofolio pribadi yang dibangun dengan Laravel, React, Inertia.js, dan Tailwind CSS.',
            'description_en' => 'Personal AI-powered portfolio website built with Laravel, React, Inertia.js, and Tailwind CSS.',
            'technologies' => ['Laravel', 'React', 'Inertia.js', 'Tailwind CSS'],
            'project_url' => 'https://portfolio.example.com',
            'github_url' => 'https://github.com/akbarhezra/portfolio',
        ]);

        Project::create([
            'title' => 'Chatbot Assistant',
            'thumbnail' => 'chatbot-thumbnail.jpg',
            'description_id' => 'Chatbot AI untuk membantu pengunjung website mengenai informasi portofolio.',
            'description_en' => 'AI chatbot to help visitors with portfolio information.',
            'technologies' => ['Laravel', 'OpenAI API', 'Tailwind CSS'],
            'project_url' => null,
            'github_url' => 'https://github.com/akbarhezra/chatbot',
        ]);
    }
}
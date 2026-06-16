<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'site_name', 'value' => 'Muhammad Akbar Hezra - AI Portfolio'],
            ['key' => 'site_logo', 'value' => null],
            ['key' => 'primary_color', 'value' => '#000000'],
            ['key' => 'theme_mode', 'value' => 'dark'],
            ['key' => 'about_me_id', 'value' => 'Saya adalah seorang developer modern spesialis Rekayasa Perangkat Lunak yang berfokus pada pengembangan aplikasi web fullstack dan AI integration.'],
            ['key' => 'about_me_en', 'value' => 'I am a modern developer specializing in Software Engineering, focusing on fullstack web development and AI integration.'],
            ['key' => 'contact_email', 'value' => 'akbarhezra@example.com'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
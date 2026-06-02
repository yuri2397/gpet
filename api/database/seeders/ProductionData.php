<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProductionData extends Seeder
{
    private const SKIP_TABLES = [
        'migrations',
        'failed_jobs',
        'password_resets',
        'personal_access_tokens',
        'oauth_access_tokens',
        'oauth_auth_codes',
        'oauth_clients',
        'oauth_personal_access_clients',
        'oauth_refresh_tokens',
    ];

    private const ORDER = [
        'roles', 'permissions',
        'departements', 'days', 'batiments', 'banks', 'services', 'course_status', 'professor_types',
        'users',
        'semesters', 'classes', 'salles',
        'u_e_s', 'e_c_s',
        'professors', 'accounts',
        'courses', 'courses_has_professors', 'times_tables', 'course_histories',
        'syllabus', 'chapitres', 'ressources',
        'seances', 'etat_seances',
        'media',
        'role_has_permissions', 'model_has_roles', 'model_has_permissions',
    ];

    public function run(): void
    {
        $sqlPath = database_path('data/pro_db.sql');

        if (! file_exists($sqlPath)) {
            $this->command->error("Missing SQL dump: {$sqlPath}");
            return;
        }

        $insertsByTable = $this->splitInserts(file_get_contents($sqlPath));

        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        try {
            foreach (self::ORDER as $table) {
                if (! isset($insertsByTable[$table])) {
                    $this->command->warn("  - {$table} (no data in dump, skipped)");
                    continue;
                }

                DB::table($table)->truncate();
                $sql = preg_replace('/^INSERT INTO/m', 'INSERT IGNORE INTO', $insertsByTable[$table]);
                DB::unprepared($sql);
                $count = DB::table($table)->count();
                $this->command->info("  ✓ {$table} ({$count} rows)");
            }

            $hash = Hash::make('bonjour');
            $updated = DB::table('users')->update(['password' => $hash]);
            $this->command->info("  ✓ Reset {$updated} user passwords to 'bonjour'");

            $found = collect(array_keys($insertsByTable))
                ->reject(fn ($t) => in_array($t, self::ORDER, true))
                ->reject(fn ($t) => in_array($t, self::SKIP_TABLES, true))
                ->all();
            if ($found) {
                $this->command->warn('Tables in dump not in import order (skipped): ' . implode(', ', $found));
            }
        } finally {
            DB::statement('SET FOREIGN_KEY_CHECKS=1');
        }

        if (function_exists('app') && app()->bound('cache')) {
            app('cache')->forget(config('permission.cache.key', 'spatie.permission.cache'));
        }
    }

    private function splitInserts(string $sql): array
    {
        $result = [];
        $current = null;
        $buffer = '';

        foreach (preg_split('/\R/', $sql) as $line) {
            if ($current === null) {
                if (preg_match('/^INSERT INTO `([^`]+)`/', $line, $m)) {
                    $current = $m[1];
                    $buffer = $line;
                    if (str_ends_with(rtrim($line), ';')) {
                        $this->collect($result, $current, $buffer);
                        $current = null;
                        $buffer = '';
                    }
                }
            } else {
                $buffer .= "\n" . $line;
                if (str_ends_with(rtrim($line), ';')) {
                    $this->collect($result, $current, $buffer);
                    $current = null;
                    $buffer = '';
                }
            }
        }

        return array_map(fn ($parts) => implode("\n", $parts), $result);
    }

    private function collect(array &$result, string $table, string $statement): void
    {
        if (in_array($table, self::SKIP_TABLES, true)) {
            return;
        }
        $result[$table][] = $statement;
    }
}

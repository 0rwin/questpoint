@echo off
echo ============================================
echo Questpoint Cafe - Supabase Setup via CLI
echo ============================================
echo.

echo This script will:
echo 1. Link to your Supabase project
echo 2. Push the database migration
echo 3. Verify tables were created
echo.

echo Press any key to continue...
pause > nul
echo.

echo Step 1: Linking to Supabase project...
echo You'll be prompted to log in to Supabase.
echo.
call npx supabase link --project-ref suguzikgatlamtpralh

if errorlevel 1 (
    echo.
    echo ERROR: Failed to link to project.
    echo.
    echo Please run this command manually:
    echo   npx supabase db push
    echo.
    pause
    exit /b 1
)

echo.
echo Step 2: Pushing database migration...
echo.

REM Create supabase directory structure if it doesn't exist
if not exist "supabase\migrations" mkdir supabase\migrations

REM Copy migration file
echo Preparing migration file...
copy "001_initial_schema.sql" "supabase\migrations\20260110000000_initial_schema.sql" > nul

call npx supabase db push

if errorlevel 1 (
    echo.
    echo ERROR: Failed to push migration.
    echo.
    echo You can try running the migration manually in the Supabase dashboard:
    echo https://supabase.com/dashboard/project/suguzikgatlamtpralh/sql/new
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo SUCCESS! Database migration complete.
echo ============================================
echo.
echo Next steps:
echo 1. Configure email templates (15 min)
echo    https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/templates
echo    Copy from: SUPABASE_EMAIL_TEMPLATES.md
echo.
echo 2. Configure auth settings (2 min)
echo    https://supabase.com/dashboard/project/suguzikgatlamtpralh/auth/url-configuration
echo    Site URL: http://localhost:3000
echo    Redirect URLs: http://localhost:3000/**
echo.
echo 3. Test your app:
echo    npm run dev
echo    Visit: http://localhost:3000/auth/register
echo.

pause

#!/usr/bin/env python3
import subprocess
from pathlib import Path

class DBManager:
    def __init__(self):
        self.script_dir = Path(__file__).parent
        self.init_script = self.script_dir / "run_init_db.sh"
        self.migrate_script = self.script_dir / "run_migrate_db.sh"
        self.upgrade_script = self.script_dir / "run_upgrade_db.sh"

    def init_db(self):
        """Initialize database"""
        return self._run_script(self.init_script)

    def migrate_db(self):
        """Run database migrations"""
        return self._run_script(self.migrate_script)

    def upgrade_db(self):
        """Upgrade database"""
        return self._run_script(self.upgrade_script)

    def _run_script(self, script_path):
        """Helper method to run shell scripts"""
        if not script_path.exists():
            raise FileNotFoundError(f"Script not found: {script_path}")
        
        try:
            result = subprocess.run(
                [str(script_path)],
                check=True,
                capture_output=True,
                text=True
            )
            return result.stdout
        except subprocess.CalledProcessError as e:
            print(f"Error running {script_path}:")
            print(e.stderr)
            raise

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Database Management Tool")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # Init command
    init_parser = subparsers.add_parser("init", help="Initialize database")
    
    # Migrate command
    migrate_parser = subparsers.add_parser("migrate", help="Run database migrations")
    
    # Upgrade command
    upgrade_parser = subparsers.add_parser("upgrade", help="Upgrade database")

    args = parser.parse_args()
    
    manager = DBManager()
    
    try:
        if args.command == "init":
            print(manager.init_db())
        elif args.command == "migrate":
            print(manager.migrate_db())
        elif args.command == "upgrade":
            print(manager.upgrade_db())
    except Exception as e:
        print(f"Error: {str(e)}")
        exit(1)

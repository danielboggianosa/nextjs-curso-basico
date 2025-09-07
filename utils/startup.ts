import { runAllMigrations } from "@/config/mysql.config"

export const runDBMigrations = (async () => {
    runAllMigrations()
})();
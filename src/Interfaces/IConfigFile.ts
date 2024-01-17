export interface ConfigFile {
    "baseurl" : string | undefined
    "username" : string | undefined
    "apiToken" : string | undefined
    "onboardState" : string | undefined
    "openInBrowser" : boolean | undefined
    "pinnedJobs" : string[] | undefined
    "projectName" : string | undefined
    "notificationSetJobs" : string[] | undefined
    "projects" : string[] | undefined
    "titlebarStyle" : "winStyle" | "macStyle" | "eggStyle" | undefined
	"notificationPermission" : string | undefined
    "notes": Notes[] | undefined
}

interface Notes {
    [key: string]: {
        [key: string]: string
    }
}

export type allowedKeys =
    "baseurl" |
    "username" |
    "apiToken" |
    "onboardState" |
    "openInBrowser" |
    "pinnedJobs" |
    "projectName" |
    "notificationSetJobs" |
    "projects" |
    "titlebarStyle" |
	"notificationPermission" |
    "notes";
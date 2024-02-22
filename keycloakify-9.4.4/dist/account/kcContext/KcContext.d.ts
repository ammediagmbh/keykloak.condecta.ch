export type KcContext = KcContext.Password | KcContext.Account;
export declare namespace KcContext {
    type Common = {
        themeVersion: string;
        keycloakifyVersion: string;
        themeType: "account";
        themeName: string;
        locale?: {
            supported: {
                url: string;
                label: string;
                languageTag: string;
            }[];
            currentLanguageTag: string;
        };
        url: {
            accountUrl: string;
            passwordUrl: string;
            totpUrl: string;
            socialUrl: string;
            sessionsUrl: string;
            applicationsUrl: string;
            logUrl: string;
            resourceUrl: string;
            resourcesCommonPath: string;
            resourcesPath: string;
            /** @deprecated, not present in recent keycloak version apparently, use kcContext.referrer instead */
            referrerURI?: string;
            getLogoutUrl: () => string;
        };
        features: {
            passwordUpdateSupported: boolean;
            identityFederation: boolean;
            log: boolean;
            authorization: boolean;
        };
        realm: {
            internationalizationEnabled: boolean;
            userManagedAccessAllowed: boolean;
        };
        message?: {
            type: "success" | "warning" | "error" | "info";
            summary: string;
        };
        referrer?: {
            url: string;
            name: string;
        };
        messagesPerField: {
            /**
             * Return text if message for given field exists. Useful eg. to add css styles for fields with message.
             *
             * @param fieldName to check for
             * @param text to return
             * @return text if message exists for given field, else undefined
             */
            printIfExists: <T extends string>(fieldName: string, text: T) => T | undefined;
            /**
             * Check if exists error message for given fields
             *
             * @param fields
             * @return boolean
             */
            existsError: (fieldName: string) => boolean;
            /**
             * Get message for given field.
             *
             * @param fieldName
             * @return message text or empty string
             */
            get: (fieldName: string) => string;
            /**
             * Check if message for given field exists
             *
             * @param field
             * @return boolean
             */
            exists: (fieldName: string) => boolean;
        };
        account: {
            email?: string;
            firstName: string;
            lastName?: string;
            username?: string;
        };
    };
    type Password = Common & {
        pageId: "password.ftl";
        password: {
            passwordSet: boolean;
        };
        stateChecker: string;
    };
    type Account = Common & {
        pageId: "account.ftl";
        url: {
            accountUrl: string;
        };
        realm: {
            registrationEmailAsUsername: boolean;
            editUsernameAllowed: boolean;
        };
        stateChecker: string;
    };
}

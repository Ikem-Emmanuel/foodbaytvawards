export interface Permission {
    center: {
        create: boolean;
        update: boolean;
        delete: boolean;
    },
    device: {
        create: boolean;
        update: boolean;
        delete: boolean;
    },
    card: {
        create: boolean;
        update: boolean;
        delete: boolean;
    },
    battery: {
        command: boolean;
    },
    firmware: {
        command: boolean;
    },
    logs: {
        read: boolean;
    },
    user_management: {
        general: boolean;
    }
}
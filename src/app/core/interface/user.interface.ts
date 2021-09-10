export interface User {
    id?: number;
    username?: string | null;
    firstname?: string | null;
    lastname?: string | null;
    mobile?: string | null;
    email: string | null;
    role: {
        id?: number | null,
        name: string | null,
        description: string | null,
        permission_type: string | null,
        permissions: any | null
    },
    token: string | null;
}
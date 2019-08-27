export interface Score {
    id: number;
    amount: number;
    quiz_id: number;
    user_id: number;
    updated_at: Date,
    created_at: Date,
    userName: string,
}
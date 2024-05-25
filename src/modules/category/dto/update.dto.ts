export class UpdateCategoryDto {
    readonly id: number;
    readonly name?: string;
    readonly description?: string;
    readonly active?: boolean;
    readonly urlimage?: string;
}
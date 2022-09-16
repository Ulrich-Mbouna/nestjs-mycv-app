import {Expose, Transform} from "class-transformer";
import {User} from "../../users/user.entity";

export class ReportDto {
    @Expose()
    id: number;

    @Transform(({ obj }) => (
        {
            id: obj.user.id,
            email: obj.user.email,
        }))
    @Expose()
    user: User;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: number

    @Expose()
    price: number;
    @Expose()
    year: number;
    @Expose()
    lng: number;
    @Expose()
    lat: number;
    @Expose()
    make: string;
    @Expose()
    model: string;
    @Expose()
    mileage: string;
    @Expose()
    approved: boolean;
}
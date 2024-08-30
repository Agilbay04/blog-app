import { Address, Company, UserDto } from '../dtos/responses/user.dto.response';

export const UserMapper = (user: any): UserDto => {
    return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: convertAddress(user.address),
        phone: user.phone,
        website: user.website,
        company: convertCompany(user.company),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deleted: user.deleted,
    };
}

const convertAddress = (address: any): Address => {
    if (!address) return null;

    const [street, suite, city, zipcode, lat, lng] = address.split(';');
    return {
        street,
        suite,
        city,
        zipcode,
        geo: {
            lat,
            lng
        }
    };
}

const convertCompany = (company: any): Company => {
    if (!company) return null;

    const [name, catchPhrase, bs] = company.split(';');
    return {
        name,
        catchPhrase,
        bs,
    };
}
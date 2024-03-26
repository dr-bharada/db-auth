import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtToken } from "../dto/jwt-token.dto";

@Injectable()
export class JwtUserTokenService {
    constructor(private jwtService: JwtService) { }
    encrytToken(user: JwtToken) : string{
        const { roles, _id } = user
        return this.jwtService.sign({ roles,id: _id })
    }
    decryptToken(token: string) : JwtToken{
        return this.jwtService.verify(token)
    }
}
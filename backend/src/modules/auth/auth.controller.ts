import { ClassSerializerInterceptor, Controller, Get, Post, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { Public } from "./decorators/public.decorator";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { ResponseInterceptor } from "../../core/interceptors/response.interceptor";

@Controller('api/auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {

    constructor(
      private authService: AuthService
    ) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post("login")
    login(@Request() req){
        return this.authService.login(req.user);
    }

    @Get('profile')
    @UseInterceptors(ClassSerializerInterceptor)
    getProfile(@Request() req){
        return req.user;
    }
}

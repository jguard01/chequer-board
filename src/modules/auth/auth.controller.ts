import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './';
import { UserLoginDto } from './dto/UserLoginDto';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { CurrentUser } from './../common/decorator/current-user.decorator';
import { UserService } from './../user/user.service';
import { UserEntity } from './../user/user.entity'
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserDto } from '../../modules/user/dto/user-dto';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) { }

    @Post('login')
    @ApiResponse({ status: 201, description: 'Successful Login' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async login(@Body() payload: UserLoginDto): Promise<LoginPayloadDto> {
        const user = await this.authService.validateUser(payload);
        return await this.authService.createToken(user);
    }

    @Post('register')
    @ApiResponse({ status: 201, description: 'Successful Registration' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async register(@Body() payload: UserRegisterDto): Promise<any> {
        const user = await this.userService.createUser(payload);
        return user.toDto();
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard())
    @Get('me')
    @ApiResponse({ status: 200, description: 'Successful Response' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getLoggedInUser(@CurrentUser() user: UserEntity): Promise<UserDto> {
        return user.toDto();
    }
}

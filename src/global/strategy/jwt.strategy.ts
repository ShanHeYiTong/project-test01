import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "../../user/entities/user.entity";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {		// 这里的 Strategy 必须是 passport-jwt 包中的
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: 'suibianshenme',
      secretOrKey: configService.get('JWT_SECRET') ?? 'secret',
    } as StrategyOptions);
  }

  async validate(payload: User) {
    const existUser = await this.userRepository.findOne({
      where: { id: payload.id },
    });

    if (!existUser) throw new UnauthorizedException('token验证失败');

    return existUser;
  }

}

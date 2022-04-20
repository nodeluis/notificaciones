import { getRepository } from "typeorm";
import { UserEntity } from "../core/entities/user.entity";

export const mainUserSeeder = async (): Promise<boolean> => {
  const userRepository = getRepository<UserEntity>(UserEntity);

  const user = await userRepository.findOne({
    where: {
      username: "admin"
    }
  });
  if (!user) {
    const newUser = new UserEntity();
    newUser.username = "admin";
    newUser.password = "admin";
    newUser.fullname = "Administrador";
    newUser.phone = "77866150";
    newUser.roles = ["SUPER_ADMIN"];
    await userRepository.save(newUser);
  }

  return true;
};
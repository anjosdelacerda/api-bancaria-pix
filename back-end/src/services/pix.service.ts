import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { Pix } from "../entities/pix.entity";
import { IPix } from "../interfaces/pix.interface";

export const createPix = async (data: IPix, userId: string) => {
  const pixRepository = AppDataSource.getRepository(Pix);
  const userRepository = AppDataSource.getRepository(User);

  console.log("4: data chegou no service", data)
  console.log("5: userId chegou no service", userId)

  const user = await userRepository.findOne({ where: { id: userId } });

  console.log("6: user encontrado", user)

  if (!user) {
    throw new Error("user not found");
  }

  const pix = new Pix();

  pix.key = data.key;
  pix.type = data.type;
  pix.value = data.value
  // pix.recipient = "fernando lacerda"
  pix.user = user;

  console.log("7: pix criado", pix)

  try {
    pixRepository.create(pix);
    await pixRepository.save(pix);
  } catch (error) {
    console.error("Erro ao salvar Pix:", error);
    throw new Error("Erro ao salvar Pix");
  }

  return pix;
};

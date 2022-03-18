import { inject, injectable } from 'tsyringe';
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: SpecificationRepository
  ) {}

  async execute({name, description}: IRequest): Promise<void> {
    const specificationAlreadyExist = await this.specificationRepository.findByName(name);

    if (specificationAlreadyExist) {
      throw new Error('Category already exists');
    }

    this.specificationRepository.create({
      name,
      description
    });
  }
}

export { CreateSpecificationUseCase }
import { PartialType } from '@nestjs/mapped-types';
import { UpdateableUserDTO } from './updateable-user.dto';

export class UpdateUserDTO extends PartialType(UpdateableUserDTO) {}

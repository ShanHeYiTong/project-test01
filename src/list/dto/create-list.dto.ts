import { ApiProperty } from "@nestjs/swagger";

export class CreateListDto {
  @ApiProperty({ title:'姓名'})
  name: string;

  @ApiProperty({ title:'年龄'})
  age: number
}

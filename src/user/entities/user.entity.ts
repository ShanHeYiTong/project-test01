@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.password = bcrypt.hashSync(this.password, 10);
  }
}


const userEntity = require('./user.entity')
const { hash, compare } = require('bcrypt')
const fs = require('fs');


class UserRepository {
    async getAllUsers() {
        try {
            const dataUser = await userEntity.findAll()
            if (dataUser) return dataUser
        } catch (error) {
            throw error
        }
    }

    async createUser(dataUser) {
        try {
            const { name, email, number, password, picture } = dataUser

            if (name.trim() !== '' && email.trim() !== '' && number !== undefined && !isNaN(number) &&
                number.toString().trim() !== '' && password.trim() !== '' && (picture?.filename?.trim() ?? '')) {

                const validateExist = await userEntity.findOne({ where: { email } })
                if (validateExist) return { message: 'Erro!Não podes criar um usuário com esse email pois ja existe' }

                const pass = await hash(password, 8)

                const createUser = await userEntity.create({
                    name,
                    email,
                    number,
                    password: pass,
                    picture: picture.filename
                })

                if (createUser) {
                    let dir = __dirname
                    const dirfixed = dir.replaceAll('\\', '/')
                    const dirfixed2 = dirfixed.replace('/user', '')
                    const imagemBinaria = fs.readFileSync(`${picture.path}`);

                    await fs.writeFile(dirfixed2 + `/public/images/${picture.filename}`, imagemBinaria, (err) => {
                        if (err) {
                            console.error('Ocorreu um erro ao salvar a imagem:', err);
                            return;
                        }
                    });
                    return { message: 'Usuario criado com sucesso', createUser }
                }
            } return { message: 'Todos os campos devem ser preenchidos!!!' }

        } catch (error) {
            throw error
        }
    }

    async updateUser(dataUser) {
        try {
            const { id, name, email, number, newPassword, oldPassword, picture } = dataUser
            if (id !== undefined && !isNaN(id) && id.toString().trim() && name.trim() !== '' &&
                email.trim() !== '' && number !== undefined && !isNaN(number) &&
                number.toString().trim() !== '' && newPassword.trim() !== '' && newPassword.trim() !== '' && (picture?.filename?.trim() ?? '') !== '') {


                const updateUser = await userEntity.findByPk(id)

                if (updateUser !== null) {
                    if (!(await compare(oldPassword, updateUser.password))) return { message: " erro password invalida" }

                    const pass = await hash(newPassword, 8)

                    let dir = __dirname
                    const dirfixed = dir.replaceAll('\\', '/')
                    const dirfixed2 = dirfixed.replace('/user', '')
                    const filePath = dirfixed2 + '/public/images' + '/' + updateUser.picture

                    function deleteFile(filePath) {
                        fs.unlink(filePath, function (error) {
                            if (error) {
                                return { message: 'Ocorreu um erro ao remover o arquivo:', error };
                            } else {
                                return { message: 'Arquivo removido com sucesso!' }
                            }
                        });
                    }

                    let t = false
                    if (fs.existsSync(filePath)) {
                        if (!(await deleteFile(filePath))) {
                            t = true
                        }
                    }

                    await updateUser.update({
                        name,
                        email,
                        number,
                        password: pass,
                        picture: picture.filename
                    })

                    if (updateUser) {
                        if (t == true) {
                            const imagemBinaria = fs.readFileSync(`${picture.path}`);

                            await fs.writeFile(dirfixed2 + `/public/images/${picture.filename}`, imagemBinaria, (err) => {
                                if (err) {
                                    console.error('Ocorreu um erro ao salvar a imagem:', err);
                                    return;
                                }
                            });
                            return { message: 'Actualizado com sucesso' }
                        } return { message: 'erro ao apagar a imagem' }
                    }

                } return { message: 'Usuario não existe' }

            } return { message: 'Todos os campos devem ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async deleteUser(dataUser) {
        try {
            const { id } = dataUser
            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '') {
                const deleteUser = await userEntity.destroy({ where: { id } })
                if (deleteUser > 0) return { message: 'Usuário eliminado com ssucesso' }
            } return { message: 'O campo deve ser preenchido!!!' }
        } catch (error) {
            throw error
        }
    }
}

module.exports = new UserRepository()
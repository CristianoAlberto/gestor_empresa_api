const employeeEntitiy = require('./employee.entity')
const userEntity = require('../user/user.entity')
const { compare } = require('bcrypt')
const fs = require('fs')

class EmployeeRepository {
    async getAllEmployees() {
        try {
            const data = await employeeEntitiy.findAll()
            return data
        } catch (error) {
            throw error
        }
    }

    async getEmployeeById(employeeData) {
        try {
            const { id } = employeeData
            if (id !== undefined && !isNaN(id) && id.toString().trim !== '') {
                const data = await employeeEntitiy.findByPk(id)
                if (data) return data
                return
            } return { message: 'O campo deve ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async createEmployee(employeeData) {
        try {

            const { name, adress, number, email, picture, positionId, departamentId } = employeeData
            if (name.trim() !== '' && adress.trim() !== '' && number !== undefined && !isNaN(number)
                && number.toString().trim() !== '' && email.trim() !== '' && positionId !== undefined && !isNaN(positionId)
                && positionId.toString().trim() !== '' && departamentId !== undefined && !isNaN(departamentId)
                && departamentId.toString().trim() !== ''
                && (picture?.filename?.trim() ?? '') !== '') {

                const validateExist = await employeeEntitiy.findOne({ where: { email } })
                if (validateExist) return { message: 'Erro! Não podes criar um usuário com esse email pois ja existe' }

                const createEmployee = await employeeEntitiy.create({

                    name,
                    adress,
                    number,
                    email,
                    picture: picture.filename,
                    positionId,
                    departamentId
                });

                if (createEmployee) {

                    let dir = __dirname
                    const dir2 = dir.replaceAll('\\', '/').replace('gestao_de_empresa_api/src/employee', 'gestaoempresafront/public/images/employeesImages')
                    const imagemBinaria = fs.readFileSync(`${picture.path}`);

                    await fs.writeFile(dir2 + `/${picture.filename}`, imagemBinaria, (err) => {
                        if (err) {
                            console.error('Ocorreu um erro ao salvar a imagem:', err);
                            return;
                        }
                    });
                    return { message: 'Funcionario criado com sucesso', createEmployee }
                }

            } return { message: 'Todos os campos devem ser preenchidos!!!' }
        } catch (error) {
            throw error
        }
    }

    async updateEmployee(employeeData) {
        try {
            const { id, name, adress, number, email, picture, positionId, departamentId } = employeeData
            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '' && name.trim() !== ''
                && adress.trim() !== '' && number !== undefined && !isNaN(number)
                && number.toString().trim() !== '' && (picture?.filename?.trim() ?? '') !== '' && departamentId !== undefined && !isNaN(departamentId) &&
                departamentId.toString().trim() !== '' && positionId !== undefined && !isNaN(positionId) && positionId.toString().trim() !== '') {

                const updateEmployee = await employeeEntitiy.findByPk(id)
                if (updateEmployee !== null && updateEmployee !== undefined) {

                    let dir = __dirname
                    const dir2 = dir.replaceAll('\\', '/').replace('gestao_de_empresa_api/src/employee', 'gestaoempresafront/public/images/employeesImages')
                    const filePath = dir2 + `/${updateEmployee.picture}`

                    function deleteFile(filePath) {
                        fs.unlink(filePath, function (error) {
                            if (error) {
                                return false
                            } else {
                                return true
                            }
                        });
                    }
                    let t = false
                    if (fs.existsSync(filePath)) {
                        if (!(await deleteFile(filePath))) {
                            t = true
                        }
                    }

                    await updateEmployee.update({
                        name,
                        adress,
                        number,
                        email,
                        picture: picture.filename,
                        positionId,
                        departamentId
                    })

                    if (updateEmployee) {
                        if (t == true) {
                            const imagemBinaria = await fs.readFileSync(`${picture.path}`);
                            await fs.writeFile(dir2 + `/${picture.filename}`, imagemBinaria, (err) => {
                                if (err) {
                                    console.error('Ocorreu um erro ao salvar a imagem:', err);
                                    return;
                                }
                            });

                            return { message: 'Funcionário actualizado com sucesso' }
                        } return { message: 'erro ao apagar a imagem' }
                    }
                } return { message: 'Funcionário não existe' }
            } return { message: 'Todos os campos devem ser preenchidos!' }
        } catch (error) {
            throw error
        }
    }

    async deleteEmployee(employeeData) {
        try {
            const { id, userId, password } = employeeData
            if (id !== undefined && !isNaN(id) && id.toString().trim() !== '' && password.trim() !== '' && userId !== undefined && !isNaN(userId) && userId.toString().trim() !== '') {
                const user = await userEntity.findOne({ where: { userId } })
                if (!user) return { message: 'Não tens autorização para eliminar!!' }
                if (!(await compare(password, user.password))) return { message: 'password errada!!' }
                const deleteEmployee = await employeeEntitiy.destroy({ where: { employeeId: id } })
                if (deleteEmployee) return { message: 'Funcionário eliminado com sucesso' }
            } return { message: 'O campo é obrigatório' }

        } catch (error) {
            throw error
        }
    }
}

module.exports = new EmployeeRepository()


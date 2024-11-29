class Responsavel {
    /**
     * Atributos da entidade responsável.
     * @param {string} rg_responsavel - Número do RG do respons vel.
     * @param {string} nome_responsavel - Nome do responsável.
     * @param {string} endereco - Endereço do responsável.
     * @param {string} graupa_responsavel - Grau de parentesco com a criança.
     * @param {string} rg_crianca - Número do RG da criança.
     * @param {string} senha - Senha para login.
     */
    constructor(rg_responsavel, nome_responsavel, endereco, graupa_responsavel, rg_crianca, senha) {
        this.rg_responsavel = rg_responsavel;
        this.nome_responsavel = nome_responsavel;
        this.endereco = endereco;
        this.graupa_responsavel = graupa_responsavel;
        this.rg_crianca = rg_crianca;
        this.senha = senha;
    }
}

module.exports = Responsavel;
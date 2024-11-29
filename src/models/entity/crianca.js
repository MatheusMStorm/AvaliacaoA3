class Crianca {
    /**
     * Atributos da entidade Criança.
     * 
     * @param {string} rg_crianca - Número do RG da criança.
     * @param {string} nome_crianca - Nome da criança.
     * @param {number} idade_crianca - Idade da criança.
     * @param {string} data_nasc - Data de nascimento da criança (formato: 'YYYY-MM-DD').
     */
    constructor(rg_crianca, nome_crianca, idade_crianca, data_nasc) {
        this.rg_crianca = rg_crianca;
        this.nome_crianca = nome_crianca;
        this.idade_crianca = idade_crianca;
        this.data_nasc = data_nasc;
    }
}

module.exports = Crianca;
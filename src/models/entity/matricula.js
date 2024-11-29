class Matricula {
/**
 * Atributos da entidade Matrícula.
 * 
 * @param {number} id_matricula - O identificador único da matrícula.
 * @param {string} rg_crianca - O RG da criança matriculada.
 * @param {number} id_turma - O ID da turma (classe) em que a criança est  matriculada.
 */
    constructor(id_matricula, rg_crianca, id_turma) {
        this.id_matricula = id_matricula;
        this.rg_crianca = rg_crianca;
        this.id_turma = id_turma;
    }
}

module.exports = Matricula;
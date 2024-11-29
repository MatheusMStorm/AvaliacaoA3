class Turma {
    /**
     * Atributos da entidade Turma.
     * 
     * @param {Number} id_turma - O identificador único da turma.
     * @param {String} turno_turma - O turno da turma.
     * @param {String} horario_turma - O horário da turma.
     * @param {String} rg_instrutor - O RG do instrutor da turma.
     * @param {Number} numero_alunos - O número de alunos na turma.
     */
    constructor(id_turma, turno_turma, horario_turma, rg_instrutor, numero_alunos) {
        this.id_turma = id_turma
        this.turno_turma = turno_turma;
        this.horario_turma = horario_turma;
        this.rg_instrutor = rg_instrutor;
        this.numero_alunos = numero_alunos;
    }
}

module.exports = Turma;
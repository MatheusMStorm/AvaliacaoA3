class Turma {
    constructor(id_turma, turno_turma, horario_turma, rg_instrutor, numero_alunos) {
        this.id_turma = id_turma
        this.turno_turma = turno_turma;
        this.horario_turma = horario_turma;
        this.rg_instrutor = rg_instrutor;
        this.numero_alunos = numero_alunos;
    }
}

module.exports = Turma;
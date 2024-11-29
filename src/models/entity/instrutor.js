class Instrutor {
/**
 * Atributos da entidade Instrutor.
 * @param {string} rg_instrutor - RG do instrutor.
 * @param {string} nome_instrutor - Nome do instrutor.
 */
    constructor(rg_instrutor, nome_instrutor) {
        this.rg_instrutor = rg_instrutor;
        this.nome_instrutor = nome_instrutor;
    }
}

module.exports = Instrutor;
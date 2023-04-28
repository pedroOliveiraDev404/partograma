export interface DadosPartograma {
    tempo: number | null // date time in ms
    posicao?: number
    dilatacao: number
}

export type LiquidoAmnioticoAspecto =
    'claro' | 'meconio1'| 'meconio2'| 'meconio3'| 'meconio4' | 'hemoamnio'

export interface GraficoLiquidoAmniotico {
    [key: string]: number[] | null
}

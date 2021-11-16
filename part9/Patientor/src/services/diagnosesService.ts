import diagnosesEntry from '../data/diagnosesEntry'
import { Diagnosis } from '../types/types'

const getDiagnosesEntry = (): Array<Diagnosis> => {
    return diagnosesEntry
}

export default getDiagnosesEntry;
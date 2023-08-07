import debounce from 'lodash/debounce'
import remove from 'lodash/remove'

const DEBOUNCE_TIME = 300

type SlotRecord = {
  adUnitPath: string
  divId: string
  slot: googletag.Slot
}

const slotsAtivos: SlotRecord[] = []
const slotsParaAtualizar: SlotRecord[] = []
const slotsParaRemover: SlotRecord[] = []

const refresh = debounce(() => googletag.cmd.push(() => googletag.pubads().refresh(remove(slotsParaAtualizar).map(s => s.slot))), DEBOUNCE_TIME)

const destroySlots = debounce(() => googletag.cmd.push(() => googletag.destroySlots(remove(slotsParaRemover).map(s => s.slot))), DEBOUNCE_TIME)

const commit = debounce(
  () =>
    googletag.cmd.push(() => {
      googletag.pubads().enableSingleRequest()
      googletag.enableServices()
    }),
  DEBOUNCE_TIME,
)

export const grumftApi = {
  defineSlot: (adUnitPath: string, sizes: googletag.MultiSize, divId: string) =>
    googletag.cmd.push(() => {
      // Código abaixo é só um exemplo vanilla usando o dfp sem nada especial. Inserir a mágica de vcs aqui.
      const slot = googletag.defineSlot(adUnitPath, sizes, divId).addService(googletag.pubads())
      // ---------------------------------------------------------------------

      slotsAtivos.push({adUnitPath, divId, slot})
      commit()
    }),

  refresh: (divId: string) => {
    const slot = slotsAtivos.find(slotAtivo => slotAtivo.divId === divId)
    if (slot == null) return
    slotsParaAtualizar.push(slot)
    refresh()
  },

  destroy: (divId: string) => {
    const slots = remove(slotsAtivos, s => s.divId === divId)
    if (slots.length == 0) return
    slotsParaRemover.push(...slots)
    destroySlots()
  },
}

import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import MealPlanModal from '@/components/MealPlanModal.vue'

describe('MealPlanModal.vue - Dynamic Form', () => {
  const mountModal = () => {
    return mount(MealPlanModal, {
      props: { isOpen: true, patientId: 1 },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
  }

  it('should start with one meal by default', () => {
    const wrapper = mountModal()
    const mealInputs = wrapper.findAll('input[placeholder="Nome da Refeição"]')
    expect(mealInputs).toHaveLength(1)
  })

  it('should add a new meal when "Adicionar Refeição" is clicked', async () => {
    const wrapper = mountModal()
    const addMealButton = wrapper.find('button.w-full')

    await addMealButton.trigger('click')

    const mealInputs = wrapper.findAll('input[placeholder="Nome da Refeição"]')
    expect(mealInputs).toHaveLength(2)
  })

  it('should remove a meal when its "Remover" button is clicked', async () => {
    const wrapper = mountModal()

    await wrapper.find('button.w-full').trigger('click')
    expect(wrapper.findAll('input[placeholder="Nome da Refeição"]')).toHaveLength(2)

    const removeButton = wrapper.find('button.text-red-500')

    await removeButton.trigger('click')

    const mealInputs = wrapper.findAll('input[placeholder="Nome da Refeição"]')
    expect(mealInputs).toHaveLength(1)
  })
})

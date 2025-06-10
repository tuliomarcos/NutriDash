import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import PatientCard from '@/components/PatientCard.vue'
import type { Patient } from '@/types'
import { RouterLinkStub } from '@vue/test-utils'

describe('PatientCard.vue', () => {
  const mockPatient: Patient = {
    id: 1,
    name: 'Ana Teste',
    email: 'ana.teste@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
  }

  it('should render patient name and email correctly', () => {
    const wrapper = mount(PatientCard, {
      props: {
        patient: mockPatient,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.text()).toContain('Ana Teste')
    expect(wrapper.text()).toContain('ana.teste@example.com')
  })

  it('should have a RouterLink pointing to the correct patient detail page', () => {
    const wrapper = mount(PatientCard, {
      props: {
        patient: mockPatient,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const routerLink = wrapper.findComponent(RouterLinkStub)
    expect(routerLink.props().to).toBe('/patient/1')
  })

  it('should display the patient avatar image', () => {
    const wrapper = mount(PatientCard, {
      props: { patient: mockPatient },
      global: { stubs: { RouterLink: RouterLinkStub } },
    })

    const image = wrapper.find('img')
    expect(image.attributes('src')).toBe(mockPatient.avatar)
    expect(image.attributes('alt')).toBe('Avatar')
  })
})

import React from 'react'
import Container from '@/components/shared/common/Container'
import Title from '@/components/shared/common/Title'
import FeaturedCarousel from './FeaturedCarousel'
import FreaturedProductGrid from './FreaturedProductGrid'

const FeatureProduct = () => {
  return (
    <Container>
        <Title title='Featured Products' label='See All' href='/products' />
        {/* desktop featured product grid */}
        <FreaturedProductGrid />

        {/* mobile featured product carousel */}
        <FeaturedCarousel />
    </Container>
  )
}

export default FeatureProduct
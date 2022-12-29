import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
`
const Paragraph = styled.p`
  color: #9e9e9e;
`
export default function Credits() {
  return (
    <Container>
      <Paragraph>Design and created by: Ihsanullah Mahboobi | 2023</Paragraph>
    </Container>
  )
}

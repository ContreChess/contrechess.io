import React, { Component } from 'react'
import {
  Button, Container, Header, Icon, Image, Label,
  Menu, Progress, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import AirdropStore from '../stores/airdrop'

class SidebarLeftOverlay extends Component {
  constructor () {
    super()
    this.state = {
      visible: false,
      airdrop: AirdropStore.getStatus()
    }
  }

  componentWillMount () {
    AirdropStore.on('change', () => {
      this.changeState({ 
        airdrop: AirdropStore.getStatus()
      })
    })
  }

  toggleVisibility = () => this.changeState({ visible: !this.state.visible })

  handleItemClick = (e, { name }) => this.changeState({ activeItem: name })

  changeState = (values) => this.setState(Object.assign(this.state, values))

  render() {
    const { visible, activeItem, airdrop } = this.state
    const whiteLabelStyle = { color: '#fff' }

    return (
      <div>
        <Sidebar.Pushable as={Segment} style={{minHeight: 500 }}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad' disabled>
              <Icon name='gamepad' />
              Play
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment textAlign='center' vertical inverted>
              <Container>
                <Menu inverted>
                  <Menu.Item
                    name='sidebar'
                    icon
                    onClick={this.toggleVisibility.bind(this)}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick.bind(this)}>
                    <Image size='mini' src='assets/images/game.svg' />
                  </Menu.Item>
                  <Menu.Item
                    name='play'
                    position='right' disabled>
                    <Button inverted>Play</Button>
                  </Menu.Item>
                </Menu>
              </Container>
              <Container text>
                <Header as='h1' inverted>Contre Chess</Header>
                <Header as='h2' inverted>Play chess with anyone in the world using the ERC20 OCC token on the Ethereum blockchain. Alpha testing will begin once the OCC airdrop has completed:</Header>
                                <Button size='huge' primary icon disabled><Icon name='right arrow' />Play</Button>
              </Container>
            </Segment>
          </Sidebar.Pusher>
            <div style={{ padding: '2em' }}>
              <Progress percent={airdrop.percent} indicating progress>
                <div class='label'>Airdropping {airdrop.amount} of {airdrop.total} billion tokens...</div>
              </Progress>
            </div>

        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftOverlay


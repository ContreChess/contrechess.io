import React, { Component } from 'react'
import { Button, Container, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class SidebarLeftOverlay extends Component {
  constructor () {
    super()
    this.state = { visible: false }

  }
  toggleVisibility = () => this.changeState({ visible: !this.state.visible })
  handleItemClick = (e, { name }) => this.changeState({ activeItem: name })
  changeState = (values) => this.setState(Object.assign(this.state, values))
  render() {
    const { visible, activeItem } = this.state

    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              <Icon name='gamepad' />
              <Link to='play'>Play</Link>
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
                    position='right'>
                    <Link to='play' ><Button inverted>Play</Button></Link>
                  </Menu.Item>
                </Menu>
              </Container>
              <Container text>
                <Header as='h1' inverted>Contre Chess</Header>
                <Header as='h2' inverted>Play chess with anyone in the world using the ERC20 OCC token on the Ethereum blockchain.</Header>
                <Link to='play' ><Button size='huge' primary icon><Icon name='right arrow' />Play</Button></Link>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftOverlay


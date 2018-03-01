import React, { Component } from 'react'
import { Button, Container, Header, Icon, Image, List, Menu, Segment, Sidebar, Tab } from 'semantic-ui-react'
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
              Play
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment textAlign='center' vertical>
              <Container>
                <Tab>
                  <Menu.Item name='lobby'>Lobby</Menu.Item>
                  <Menu.Item name='games'>Games</Menu.Item>
                  <Tab.Pane>
                    <List>
                      <List.Item>Apples</List.Item>
                      <List.Item>Pears</List.Item>
                      <List.Item>Oranges</List.Item>
                    </List>
                  </Tab.Pane>
                  <Tab.Pane>
                  </Tab.Pane>
                </Tab>
              </Container>
              <Container text>
                <Header as='h1' inverted>Contre Chess</Header>
                <Header as='h2' inverted>Play chess with anyone in the world using the ERC20 OCC token on the Ethereum blockchain.</Header>
                <Button size='huge' primary icon><Icon name='right arrow' />Play</Button>
              </Container>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default SidebarLeftOverlay


import React, { Component, PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'
// import Sound from 'react-native-sound'
import Dimensions from 'Dimensions' // eslint-disable-line

import { NORMIE, CLICKER } from './tileTypes'
import { getMinValue } from './logic'
import NormieTile from './NormieTile'
import ClickerTile from './ClickerTile'

const { width } = Dimensions.get('window')
const CELL_SIZE = Math.floor(width * 0.2) // 20% of the screen width
const CELL_PADDING = Math.floor(CELL_SIZE * 0.05) // 5% of the cell size
const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2

// const click = new Sound('click.wav', Sound.MAIN_BUNDLE)

function getStyles(state) {
  const { rows, cols } = state

  const styles = StyleSheet.create({
    root: {
      width: CELL_SIZE * cols,
      height: CELL_SIZE * rows,
      backgroundColor: 'transparent',
    },
  })

  return styles
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

class Board extends Component {
  static propTypes = {
    layout: PropTypes.array.isRequired,
    values: PropTypes.array.isRequired,
    onWin: PropTypes.func,
  }

  defaultProps = {
    onWin: () => {},
  }

  constructor(props) {
    super(props)

    this.initLevel(props)
  }

  componentWillReceiveProps(nextProps) {
    this.initLevel(nextProps)
  }

  initLevel(props) {
    const { layout } = props
    const rows = layout.length
    const cols = layout[0].length

    const tiles = []
    let i = 0
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const t = layout[row][col]
        const tile = {
          id: i,
          type: t.type,
          isVisible: true,

          max: t.max,
          current: t.current,
        }

        switch(t.type) {
          case NORMIE:
            tile.value = t.value
            break

          case CLICKER:
            tile.values = t.values
            tile.max = t.values.length
            tile.current = 0
            tile.value = tile.values[0]
            break
        }

        tile.text = tile.value

        tiles[i] = tile
        i++
      }
    }

    this.state = {
      tiles,
      cols,
      rows,
      stats: { clicks: 0, wrong: 0 },
    }
  }

  handleNormieTileClick = (id) => {
    const { stats } = this.state
    stats.clicks++

    // click.play()

    const { tiles } = this.state
    const tile = tiles[id]
    const values = tiles.filter(x => x.isVisible).map(x => x.value)
    const nextValue = getMinValue(values)
    if (tile.value === nextValue) {
      tile.isVisible = false
      tiles[id] = tile
      this.setState({ tiles, stats })
    } else {
      stats.wrong++
      this.setState({ stats })
    }
  }

  handleClickerTileClick = (id) => {
    const { tiles } = this.state
    const tile = tiles[id]
    const values = tiles.filter(x => x.isVisible).map(x => x.value)
    const nextValue = getMinValue(values)
    if (tile.value === nextValue) {
      tile.current++
      if (tile.current === tile.max) {
        tile.isVisible = false
      } else {
        tile.value = tile.values[tile.current]
        tile.text = tile.value
      }
      tiles[id] = tile
      this.setState({ tiles })
    }
  }

  render() {
    const styles = getStyles(this.state)
    const { tiles, cols } = this.state

    if (tiles.filter(x => x.isVisible).length === 0) {
      this.props.onWin(this.state.stats)
    }

    return (
      <View style={styles.root}>
        {tiles.map(tile => {
          const index = tile.id
          const row = Math.floor(index / cols)
          const col = index % cols
          const position = {
            left: col * CELL_SIZE + CELL_PADDING,
            top: row * CELL_SIZE + CELL_PADDING,
          }

          switch(tile.type) {
            case NORMIE:
              return (
                <NormieTile
                  key={index}
                  id={index}
                  position={position}
                  size={TILE_SIZE}
                  text={tile.text}
                  isVisible={tile.isVisible}
                  onClick={() => this.handleNormieTileClick(index)}
                />
              )
            case CLICKER:
              return (
                <ClickerTile
                  key={index}
                  id={index}
                  position={position}
                  size={TILE_SIZE}
                  text={tile.text}
                  isVisible={tile.isVisible}
                  max={tile.max}
                  current={tile.current}
                  onClick={() => this.handleClickerTileClick(index)}
                />
              )
          }
        })}
      </View>
    )
  }
}

export default Board

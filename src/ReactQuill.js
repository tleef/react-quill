import React from 'react'
import PropTypes from 'prop-types'
import Quill from 'quill'

export default class ReactQuill extends React.Component {
  constructor () {
    super()

    this.container = React.createRef()

    this.getEditor = this.getEditor.bind(this)
    this.createEditor = this.createEditor.bind(this)
    this.getEditorConfig = this.getEditorConfig.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }

  componentDidMount () {
    this.createEditor()
  }

  componentWillUnmount () {
    this.editor = null
  }

  render () {
    return (
      <div
        ref={this.container}
        className={this.props.className}
      />
    )
  }

  getEditor () {
    return this.editor
  }

  createEditor () {
    const config = this.getEditorConfig()
    const container = this.container.current

    this.editor = new Quill(container, config)

    this.editor.on('text-change', this.handleTextChange)
    this.editor.on('selection-change', this.handleSelectionChange)
    this.editor.on('editor-change', this.handleEditorChange)
  }

  handleTextChange (delta, oldDelta, source) {
    if (this.props.onTextChange) {
      this.props.onTextChange(delta, oldDelta, source)
    }
  }

  handleSelectionChange (range, oldRange, source) {
    if (this.props.onSelectionChange) {
      this.props.onSelectionChange(range, oldRange, source)
    }
  }

  handleEditorChange (eventName, ...args) {
    if (this.props.onEditorChange) {
      this.props.onEditorChange(eventName, ...args)
    }
  }

  getEditorConfig () {
    const config = {}

    if (this.props.hasOwnProperty('bounds')) {
      config.bounds = this.props.bounds
    }

    if (this.props.hasOwnProperty('debug')) {
      config.debug = this.props.debug
    }

    if (this.props.hasOwnProperty('formats')) {
      config.formats = this.props.formats
    }

    if (this.props.hasOwnProperty('modules')) {
      config.modules = this.props.modules
    }

    if (this.props.hasOwnProperty('placeholder')) {
      config.placeholder = this.props.placeholder
    }

    if (this.props.hasOwnProperty('readOnly')) {
      config.readOnly = this.props.readOnly
    }

    if (this.props.hasOwnProperty('scrollingContainer')) {
      config.scrollingContainer = this.props.scrollingContainer
    }

    if (this.props.hasOwnProperty('theme')) {
      config.theme = this.props.theme
    }

    return config
  }
}

ReactQuill.propTypes = {
  className: PropTypes.string,
  bounds: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  debug: PropTypes.oneOf(['error', 'warn', 'log', 'info', true, false]),
  formats: PropTypes.arrayOf(PropTypes.string),
  modules: PropTypes.object,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  scrollingContainer: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  theme: PropTypes.string,
  onTextChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onEditorChange: PropTypes.func
}

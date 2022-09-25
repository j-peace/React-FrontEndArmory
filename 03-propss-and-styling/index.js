let createElement = React.createElement

let rootElement =
  createElement('div', {backgroundColor: : 'blue-border', }, 
    createElement('h1', {}, "Contacts"),
    createElement('div', {},
      createElement(
        'div',
        {},
        createElement('div', {}, "JN"),
        createElement('span', {}, "James Nelson"),
        createElement(
          'a',
          { href: 'mailto:james@frontarm.com' },
          "james@frontarm.com",
        ),
        
      ),
      createElement(
        'div',
        {},
        createElement('div', {}, "M"),
        createElement('span', {}, "Me"),
        createElement(
          'a',
          { href: 'mailto:me@example.com' },
          "me@example.com"
        )
      )
    )
  )

// The `ReactDOM` variable is set by the second `<script>` tag
// in the above HTML file
let domNode = document.getElementById('root')
ReactDOM.render(rootElement, domNode)
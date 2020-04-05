# Tostadeira

I use a simple toaster from time to time in my projects.

## Styling

There are some pre-defined CSS Variables in toaster's style:

```
--torrada-max-width: 19em
--torrada-color-bg: #FEEFB3
--torrada-font-size: 0.75rem
--torrada-color-text: #704400
--torrada-padding: 0.8em
--torrada-border-radius: 5px
--torrada-z-index: 5

--torrada-color-bg-error: #E01E1E
--torrada-color-text-error: #FFFFFF|white

--torrada-color-bg-success: #5CB85C
--torrada-color-text-success: #0F1D0F
```
you can redefine them in your own css if you want, I suggest writing to `:root {}`.
## TODO

- [ ] Change package bundler to another that resolves functions better.
- [x] Change `lit-html` to DRY template generator, to provide minimum size in the resulting module.
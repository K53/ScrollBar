# CoffeeScript
$ () ->
    instance = new ScrollBar(".content", ".scroll", ".bar", ".bar-rail", "bar-rail-active")
        
class window.ScrollBar
     constructor: (content, scroll, bar, barRail, barRailActive) ->
        @content         =   content
        @scroll          =   scroll
        @bar             =   bar
        @barRail         =   barRail
        @barRailActive   =   barRailActive
        @delay = 1500
        @timer = 0
        
        $(@scroll).on "scroll", @scrollStopEventTrigger.bind this 

        $(@scroll).on "scroll", @barSize.bind this 

        $(window).on "resize load", @barSize.bind this 

        $(@barRail).on "mouseenter", @showBar.bind this
        
        $(window).on "scrollstop mouseleave", () =>
            $(@barRail).removeClass @barRailActive
            
     barSize : -> 
        totalHeight     =   $(@content).outerHeight()
        visibleHeight   =   $(window).height()
        barHeight       =   visibleHeight / totalHeight * visibleHeight
        top             =   $(@scroll).scrollTop() * visibleHeight / totalHeight

        $(@bar).css "height",barHeight
        $(@bar).css "top", top

        @showBar()
        undefined
    
     showBar : -> 
        $(@barRail).addClass @barRailActive
        undefined

     scrollStopEventTrigger : -> 
        if @timer
            clearTimeout @timer
        @timer = setTimeout(() => 
            $(window).trigger "scrollstop"
            undefined
        , @delay)
        undefined



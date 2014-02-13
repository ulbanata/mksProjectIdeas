$(document).ready(function() {
  var DataRef = new Firebase('https://mks4projideas.firebaseio.com/');

  $('#submit').on('click', function() {
  //   if (e.keyCode == 13 && $('#location').val() != '') {
    var appname = $('#appname').val();
    $('#appname').val("")
    var author = $('#author').val();
    $('#author').val("");
    var contact = $('#contact').val();
    $('#contact').val("");
    var descrip = $('#descrip').val();
    $('#descrip').val("");
    var votes = 1;
    var locDataRef = new Firebase('https://mks4projideas.firebaseio.com/'+appname.replace(/ /g, ''));
    //nameRef.set({appname : appname});
    locDataRef.child('appname').set(appname);
    locDataRef.child('author').set(author);
    locDataRef.child('contact').set(contact);
    locDataRef.child('descrip').set(descrip);
    locDataRef.child('votes').set(votes);
    // myDataRef.push({location: location, votes: votes});
    // $('#location').val('');
    // }
  });

  DataRef.on('child_added', function(snapshot) {
    var idea = snapshot.val();
    if(idea.votes != undefined) {
      displayIdea(idea.appname, idea.author, idea.contact, idea.votes, idea.descrip)
    }
  });

  DataRef.on('child_changed', function(snapshot) {
    var idea = snapshot.val();
    if(idea.votes != undefined) {
      displayIdea(idea.appname, idea.author, idea.contact, idea.votes, idea.descrip)
    }
  });

  function shortestCol() {
    var col1Height = $('#col_1').height();
    var col2Height = $('#col_2').height();
    var col3Height = $('#col_3').height();
    if(col1Height <= col2Height && col1Height <= col3Height){
      return 1
    }else if(col2Height <= col3Height){
      return 2
    }else {
      return 3
    }
  }

  function displayIdea(appname, author, contact, votes, descrip) {
    console.log(appname, author, contact, votes, descrip)
    newIdea= [];
    newIdea[0] = '<div class="row idea" id="' + appname.replace(/ /g, '') + '">';
    newIdea[1] = '<h2>'+appname+'</h2>';
    newIdea[2] = '<p>' + descrip + '</p>';
    newIdea[3] = '<h3>Author: ' + author + '</h3>';
    newIdea[4] = '<h3>Contact: ' + contact + '</h3>';
    // newIdea[5] = '<div class="votes">' + votes +'</div>';
    newIdea[5] = '</div>'
    $('#col_' + shortestCol()).append(newIdea.join("\n"));
  };

  // function changeVoteTotal(name, votes) {
  //   console.log("Updating votes");
  //   name = name.replace(/ /g, '');
  //   $('#'+name+' .count').replaceWith('<div class="count large-6 columns">'+votes+'</div>');
  // };

  // $("#eatinspots").on("click", ".thumbsup", function() {
  //   name = $(this).parents(".restaurant").attr("id")
  //   var locDataRef = new Firebase('https://flickering-fire-9899.firebaseio.com/'+name)
  //   locDataRef.get()
  //   $('#'+name+' .count').replaceWith('<div class="count large-6 columns">'+votes+'</div>');
  // });
});


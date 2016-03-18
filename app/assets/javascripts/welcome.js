$(document).ready(function() {
  var baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users'

  if (location.pathname === '/') {
    $.ajax({
      url: baseUrl,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        var tbody = $('#users');
        data.users.forEach(function(user) {
          var first_name = user.first_name ? user.first_name : '';
          var last_name = user.last_name ? user.last_name : '';
          var phone_number = user.phone_number ? user.phone_number : '';
          var row = '<tr><td>' + user.first_name + '</td>';
              row += '<td>' + last_name + '</td>';
              row += '<td>' + phone_number + '</td>';
              row += '<td><button data-id="' + user.id + '" class="btn btn-primary">Show</button></td></tr>';
              tbody.append(row);
        });
      },
      error: function(error) {
        console.log(error);
      }
    });
  }
  $(document).on('click', '.btn', function() {
    var id = this.dataset.id;
    location.href = '/welcome/' + id;
  });

  $('#new_person').on('submit', function(e) {
    e.preventDefault();
    $.ajax( {
      url: baseUrl,
      type: 'POST',
      dataType: 'JSON',
      data: $(this).serializeArray(),
      success: function(data) {
        location.href = '/';
      }
    });
  });

  $(document).on('click', '.btn', function(){
    var id = this.dataset.id;
    $.ajax({
      url: baseUrl + '/' + id,
      type: 'DELETE',
      success: function() {
        location.href = '/';
      }
    });
  });

  var re = /\/welcome\/\d+/;
  if (location.pathname.match(re)) {
    var panel = $('.panel');
    var id = panel.data('id');
    $.ajax({
      url: baseUrl + '/' + id,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        var user = data.user;
        panel.children('#heading').html(user.name);
        var list = $('#user');
        var first_name = '<li>First name: ' + user.first_name + '</li>';
        var last_name = '<li>Last name: ' + user.last_name + '</li>';
        var remove = '<li><button class="btn btn-danger" id="remove">Delete</button></li>';
        list.append(first_name);
        list.append(last_name);
        list.append(remove);

      }
    });
  }



});
 















// icons from heroicons
const icon_play = `<svg xmlns="http://www.w3.org/2000/svg" class="icon-play" viewBox="0 0 20 20" fill="currentColor">
<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
</svg>`

const icon_lock = `<svg xmlns="http://www.w3.org/2000/svg" class="icon-lock" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
</svg>`

const fetchData = () => {
  $(".issues-table").html("<div class='loading-centered'>Loading...</div>")
  $.getJSON("/js/data.json", function (data) {
    if (data && data.length) {
      $(".issues-table .loading-centered").remove()

      $(".issues-table").append(`
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Issue</th>
              <th>Due date</th>
              <th>Order number</th>
              <th>Job id</th>
              <th>Job name</th>
              <th>Qty</th>
              <th>Preview</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
          </tbody>
        </table>
      `)

      data.map(obj => {
        const { issue, dueDate, orderNumber,
          jobId, jobName, qty, preview, status } = obj

        $(".issues-table table tbody").append(`
       <tr>
         <td><input type="checkbox" /></td>
         <td>${issue}</td>
         <td>${dueDate}</td>
         <td>${orderNumber}</td>
         <td>${jobId}</td>
         <td>${jobName}</td>
         <td>${qty}</td>
         <td><img class="table-img" src=${preview} alt="start task icon" /></td>
         ${status ? `<td>${icon_play}</td>`
            : `<td>${icon_lock}</td>`}
       </tr>
    `)
      })

    }

    $(".issues-table table tbody tr").each(function () {
      $(this).click(function () {
        if ($(this).hasClass("is-selected")) {
          $(this).removeClass("is-selected")
        } else {
          $(".issues-table table tbody tr").removeClass("is-selected")
          $(this).addClass("is-selected")
        }
      })
    })

  }).fail(function () {
    $(".issues-table .loading-centered").text("Error fetching data.")
    throw new Error("An error has occurred reading 'data.json' file.")
  })
}

fetchData()

// filter selection
$(".issues-selection .selection").each(function () {
  $(this).click(function () {
    $(".issues-selection .selection").removeClass("active")
    $(this).addClass("active")
  })
})

// handle logging in/out
$(".log-btn").click(function () {
  if ($(this).hasClass("btn-login")) {
    $(this).removeClass("btn-login");
    $(this).addClass("btn-logout");
    $(this).text("Logout")
    // doLogin();
    $(".user-container .user").append(`<div class="user">
    <img class="user-icon" src="images/user-image.png" alt="user icon">
    <span class="user-name">John Doe</span>
  </div>`)
  } else if ($(this).hasClass("btn-logout")) {
    $(this).removeClass("btn-logout");
    $(this).addClass("btn-login");
    $(this).text("Login")
    // doLogout();
    $(".user-container .user").children().remove()
  }
});

// issues details nav
$(".issues-detail-nav-list .nav-item").each(function () {
  $(this).click(function () {
    $(".issues-detail-nav-list .nav-item").removeClass("active")
    $(this).addClass("active")

    if ($(this).hasClass("linked-tasks")) {
      $(".issues-detail-container .issue-content").html(`<h2>Linked Tanks</h2>`)
    } else {
      $(".issues-detail-container .issue-content").html(defaultIssueElements)
    }
  })
})

// handle start popup
$(".start-done-container .btn-start").click(function () {
  $(".start-done-popup.start-task").addClass("is-visible")
})
$(".start-done-popup.start-task .btn.yes").click(function () {
  alert("Task Started")
})
$(".start-done-popup.start-task .btn.no").click(function () {
  $(".start-done-popup.start-task").removeClass("is-visible")
})
$(".start-done-popup.start-task").click(function (e) {
  if (!$(e.target).is($(".popup-container")) && !$(e.target).is($(".popup-container .alert-text")) && !$(e.target).is($(".start-done-popup.start-task .btn.yes"))) {
    $(".start-done-popup.start-task").removeClass("is-visible")
  }
})

// handle done popup
$(".start-done-container .btn-done").click(function () {
  $(".start-done-popup.done-task").addClass("is-visible")
})
$(".start-done-popup.done-task .btn.yes").click(function () {
  alert("Task is Done")
})
$(".start-done-popup.done-task .btn.no").click(function () {
  $(".start-done-popup.done-task").removeClass("is-visible")
})
$(".start-done-popup.done-task").click(function (e) {
  if (!$(e.target).is($(".popup-container")) && !$(e.target).is($(".popup-container .alert-text")) && !$(e.target).is($(".start-done-popup.done-task .btn.yes"))) {
    $(".start-done-popup.done-task").removeClass("is-visible")
  }
})

const defaultIssueElements = `<div class="issue-item">
<div>
  <p class="heading">Job info</p>
  <p class="description">
    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
    Perferendis perspiciatis aspernatur beatae, architecto ipsum
    non velit pariatur quisquam delectus repudiandae iusto rerum
    dolorem odit eum aut labore, nisi a?
  </p>
</div>
<img src="images/chair-photo-min.jpg" alt="brown leather chair">
</div>
<div class="issue-item">
  <div class="customer">
    <p class="heading">Customer</p>
    <adress class="contact">
      <p class="description">Dynamicsoft Doo</p>
      <p class="description">Street Vase Stajica 6, 21101 Novi Sad</p>
      <p class="description">email: info@dynamicsoft.it</p>
      <p class="description">Tel: ++381 (0)64 6421 258</p>
    </adress>
    </div>
    <div class="delivery">
      <p class="heading">Delivery info</p>
      <adress class="contact">
        <p class="description">Dynamicsoft Srl</p>
        <p class="description">Via S.Pescatori 117, 83100 Avellino</p>
        <p class="description">Tel: +39 0825 45.81.85</p>
    </adress>
  </div>
</div>`
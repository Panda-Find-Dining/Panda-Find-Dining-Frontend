import React from 'react'

const Welcome = () => {
  return (
    <div id="greeting-container">

        <img
          style={{
            width: 500,
            marginTop: 5,
          }}
          src="https://res.cloudinary.com/teepublic/image/private/s--l0ybv7o7--/c_crop,x_10,y_10/c_fit,w_1109/c_crop,g_north_west,h_1260,w_1260,x_-76,y_-131/co_rgb:ffffff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-76,y_-131/bo_157px_solid_white/e_overlay,fl_layer_apply,h_1260,l_Misc:Art%20Print%20Bumpmap,w_1260/e_shadow,x_6,y_6/c_limit,h_1134,w_1134/c_lpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1509981176/production/designs/2029103_1.jpg"
        alt="logo placeholder"
        />
        <p>
          <i>
            "A bond between friends is impossible to break, except when deciding
            where to eat."
          </i>{" "}
          - Hungry Panda
        </p>
        <p>
          Find Dining will help with the emotional labor of deciding what's for
          dinner. Register now to invite a friend to a meal. You'll then both be
          presented with restaraunt selections. Choose your preferences and
          submit. Once you both match on a restaurant you can be on you merry
          way and have time for making more pressing decisions, like what to
          what series to binge!
        </p>
      </div>
  )
}

export default Welcome


import React from 'react'
import "./Testimonials.css"

const Testimonials = () => {
    const testimonialsData = [
      {
        id: 1,
        name: "John Doe",
        position: "Student",
        message:
          "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
        image:
          "https://i.pinimg.com/736x/e3/90/0e/e3900e29625c3c1038ef6cfd88c337a3.jpg",
      },
      {
        id: 2,
        name: "Jane Smith",
        position: "Student",
        message:
          "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
        image:
          "https://i.pinimg.com/1200x/64/fa/d3/64fad395b35bf77ed1aadb4de16206d3.jpg",
      },
      {
        id: 3,
        name: "Joe Kerry",
        position: "Student",
        message:
          "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
        image:
          "https://i.pinimg.com/736x/3d/1f/3c/3d1f3c3be9ae71b3d2d09c04d610c58c.jpg",
      },
      {
        id: 4,
        name: "Sadie Sink",
        position: "Student",
        message:
          "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
        image:
          "https://i.pinimg.com/1200x/dd/cc/4e/ddcc4e83c188e9a69ae2b6bbeebbd388.jpg",
      },
    ];
  return (
    <section className='testimonials'>
        <h2>What our students say</h2>
        <div className='testimonials-cards'>
        {
            testimonialsData.map((e)=>(
                <div className='testimonial-card' key={e.id}>
                    <div className='student-image'>
                        <img src={e.image} alt='photo'/>
                    </div>
                    <p className='message'>{e.message}</p>
                    <div className='info'>
                        <p className='name'>
                        {e.name}

                        </p>
                        <p className='position'>{e.position}</p>
                    </div>
                </div>
            ))
        }

            
        </div>
    </section>
   
  )
}

export default Testimonials

import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClientMetadata from "@/components/Client/ClientMetadata/ClientMetadata";
import BreadcrumbsComponent from "@/components/Blogs/Breadcrumbs";
import { siteConfig } from "@/config/default.config";
const FAQPage: React.FC = () => {
  const faqData = [
    {
      question: "Làm thế nào để đặt xe?",
      answer:
        "Bạn có thể đặt xe qua ứng dụng hoặc website của chúng tôi. Chỉ cần nhập điểm đi và điểm đến, hệ thống sẽ tìm tài xế gần nhất cho bạn.",
    },
    {
      question: "Dịch vụ có hoạt động 24/7 không?",
      answer:
        "Có, chúng tôi cung cấp dịch vụ 24/7, tuy nhiên, vào giờ cao điểm hoặc đêm khuya có thể mất thêm thời gian để tìm tài xế.",
    },
    {
      question: "Tôi có thể thanh toán bằng những phương thức nào?",
      answer:
        "Chúng tôi hỗ trợ thanh toán qua tiền mặt, thẻ ngân hàng, ví điện tử như Momo, ZaloPay, và VNPay.",
    },
    {
      question: "Tôi có thể đặt xe trước không?",
      answer:
        "Có, bạn có thể đặt xe hẹn giờ thông qua ứng dụng. Hãy chọn thời gian phù hợp và tài xế sẽ đến đón bạn đúng giờ.",
    },
    {
      question: "Dịch vụ có hỗ trợ giao hàng không?",
      answer:
        "Có, bạn có thể sử dụng dịch vụ giao hàng bằng xe máy hoặc ô tô tùy vào nhu cầu của mình.",
    },
    {
      question: "Tôi có thể hủy chuyến xe không?",
      answer:
        "Bạn có thể hủy chuyến xe trước khi tài xế đến mà không bị mất phí. Tuy nhiên, nếu hủy sau khi tài xế đã đến, có thể bị tính phí hủy chuyến.",
    },
    {
      question: "Thông tin cá nhân của tôi có được bảo mật không?",
      answer:
        "Chúng tôi cam kết bảo mật thông tin cá nhân của bạn và không chia sẻ với bên thứ ba nếu không có sự đồng ý của bạn.",
    },
  ];

  return (
    <>
      <ClientMetadata
        title={"Câu Hỏi Thường Gặp | " + siteConfig.name}
        slug="/faq"
        description={siteConfig.description + " | FAQ"}
        isIndex={true}
      />
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <div className="my-6">
          <BreadcrumbsComponent
            breadcrumbs={[{ name: "Trang Chủ", url: "/" }]}
            currentTitle="FAQ"
          />
        </div>
        <Typography variant="h4" gutterBottom>
          Câu Hỏi Thường Gặp (FAQ)
        </Typography>
        <Typography variant="body1" paragraph>
          Dưới đây là những câu hỏi phổ biến về dịch vụ của chúng tôi. Nếu bạn
          có thắc mắc khác, vui lòng liên hệ với chúng tôi.
        </Typography>

        {faqData.map((faq, index) => (
          <Accordion sx={{ background: "transparent" }} key={index}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </>
  );
};

export default FAQPage;
